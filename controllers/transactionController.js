import prisma from "../config/prisma.js";

// ✅ Create transaction
export const createTransaction = async (req, res) => {
  try {
    const { type, category, amount, note } = req.body;
    const userId = req.user.id; // from auth middleware

    const transaction = await prisma.transaction.create({
      data: { type, category, amount: parseFloat(amount), note, userId },
    });

    res.json({ message: "Transaction created", transaction });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all user transactions
export const getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;

    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, category, amount, note } = req.body;

    const updated = await prisma.transaction.update({
      where: { id },
      data: { type, category, amount: parseFloat(amount), note },
    });

    res.json({ message: "Transaction updated", updated });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete transaction
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.transaction.delete({ where: { id } });

    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
