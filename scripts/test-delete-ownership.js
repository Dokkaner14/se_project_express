(async () => {
  const base = "http://localhost:3001";
  const {fetch} = globalThis;

  async function signin(email, password) {
    const res = await fetch(`${base}/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const j = await res.json();
    if (!res.ok)
      throw new Error(`Signin failed: ${res.status} ${JSON.stringify(j)}`);
    return j.token;
  }

  async function createItem(token) {
    const res = await fetch(`${base}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: "OwnerItem",
        weather: "hot",
        imageUrl: "https://example.com/item.png",
      }),
    });
    const j = await res.json();
    return { status: res.status, body: j };
  }

  async function deleteItem(token, id) {
    const res = await fetch(`${base}/items/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    let body = null;
    try {
      body = await res.json();
    } catch (e) {
      body = null;
    }
    return { status: res.status, body };
  }

  try {
    const tokenA = await signin("newuser@example.com", "mypwd");
    console.log("tokenA obtained");
    const tokenB = await signin(
      "testverify+1783471331@example.com",
      "verifyPass123"
    );
    console.log("tokenB obtained");

    const created = await createItem(tokenA);
    console.log("create status", created.status);
    console.log("create body", JSON.stringify(created.body));
    const itemId = created.body && created.body.data && created.body.data._id;
    if (!itemId) throw new Error("Failed to create item");

    const attemptDeleteByB = await deleteItem(tokenB, itemId);
    console.log("delete by B status", attemptDeleteByB.status);
    console.log("delete by B body", JSON.stringify(attemptDeleteByB.body));

    const deleteByA = await deleteItem(tokenA, itemId);
    console.log("delete by A status", deleteByA.status);
    console.log("delete by A body", JSON.stringify(deleteByA.body));
  } catch (e) {
    console.error("ERROR", e);
    process.exit(1);
  }
})();
