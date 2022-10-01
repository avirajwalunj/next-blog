import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const { email, name, message } = req.body;
    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "Inavlid Input" });
      return;
    }
    const newMessage = {
      email,
      name,
      message,
    };
    let client;

    const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.ry0uf.mongodb.net/${process.env.mongodb_database}?retryWrites=true&w=majority`;

    try {
      client = await MongoClient.connect(connectionString);
    } catch (error) {
      res.status(500).json({ message: "could not connect to database" });
    }

    const db = client.db();

    try {
      console.log(newMessage);
      await db.collection("messages").insertOne({ newMessage });
      newMessage.id = res.insertId;
    } catch (error) {
      client.close();
      console.log(error);
      res.status(500).json({ message: "Storing msg failed" });
      return;
    }

    client.close();
    console.log(newMessage);

    res
      .status(201)
      .json({ message: "Successfully store data", message: newMessage });
  }
}

export default handler;
