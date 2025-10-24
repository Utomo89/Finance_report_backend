import prisma from "../config/prisma.js";

export const getSummary = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await prisma.transaction.aggregate({
      where: { userId, type: "income" },
      _sum: { amount: true },
    });

    const expense = await prisma.transaction.aggregate({
      where: { userId, type: "expense" },
      _sum: { amount: true },
    });

    const totalIncome = income._sum.amount || 0;
    const totalExpense = expense._sum.amount || 0;
    const balance = totalIncome - totalExpense;

    res.json({
      totalIncome,
      totalExpense,
      balance,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get summary" });
  }
};
