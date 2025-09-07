import { z } from 'zod';

// Enums for categories
export const expenseCategoryEnum = z.enum([
  'food',
  'transport', 
  'tuition',
  'entertainment',
  'rent',
  'other'
]);

export const earningCategoryEnum = z.enum([
  'salary',
  'scholarship', 
  'parents_allowance',
  'freelance',
  'other'
]);

export type ExpenseCategory = z.infer<typeof expenseCategoryEnum>;
export type EarningCategory = z.infer<typeof earningCategoryEnum>;

// User schema
export const userSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  name: z.string(),
  created_at: z.coerce.date()
});

export type User = z.infer<typeof userSchema>;

// Expense schema
export const expenseSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  amount: z.number(),
  category: expenseCategoryEnum,
  description: z.string().nullable(),
  date: z.coerce.date(),
  created_at: z.coerce.date()
});

export type Expense = z.infer<typeof expenseSchema>;

// Earning schema
export const earningSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  amount: z.number(),
  category: earningCategoryEnum,
  description: z.string().nullable(),
  date: z.coerce.date(),
  created_at: z.coerce.date()
});

export type Earning = z.infer<typeof earningSchema>;

// Budget schema
export const budgetSchema = z.object({
  id: z.number(),
  user_id: z.number(),
  category: expenseCategoryEnum,
  amount: z.number(),
  period: z.enum(['weekly', 'monthly', 'yearly']),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date()
});

export type Budget = z.infer<typeof budgetSchema>;

// Dashboard data schema
export const dashboardDataSchema = z.object({
  spending_by_category: z.array(z.object({
    category: expenseCategoryEnum,
    amount: z.number()
  })),
  monthly_income_vs_expenses: z.array(z.object({
    month: z.string(),
    income: z.number(),
    expenses: z.number()
  }))
});

export type DashboardData = z.infer<typeof dashboardDataSchema>;

// Input schemas for creating records
export const createUserInputSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1)
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;

export const createExpenseInputSchema = z.object({
  user_id: z.number(),
  amount: z.number().positive(),
  category: expenseCategoryEnum,
  description: z.string().nullable(),
  date: z.coerce.date()
});

export type CreateExpenseInput = z.infer<typeof createExpenseInputSchema>;

export const createEarningInputSchema = z.object({
  user_id: z.number(),
  amount: z.number().positive(),
  category: earningCategoryEnum,
  description: z.string().nullable(),
  date: z.coerce.date()
});

export type CreateEarningInput = z.infer<typeof createEarningInputSchema>;

export const createBudgetInputSchema = z.object({
  user_id: z.number(),
  category: expenseCategoryEnum,
  amount: z.number().positive(),
  period: z.enum(['weekly', 'monthly', 'yearly'])
});

export type CreateBudgetInput = z.infer<typeof createBudgetInputSchema>;

// Input schemas for updating records
export const updateBudgetInputSchema = z.object({
  id: z.number(),
  amount: z.number().positive().optional(),
  period: z.enum(['weekly', 'monthly', 'yearly']).optional()
});

export type UpdateBudgetInput = z.infer<typeof updateBudgetInputSchema>;

// Query schemas
export const getUserExpensesInputSchema = z.object({
  user_id: z.number(),
  category: expenseCategoryEnum.optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional()
});

export type GetUserExpensesInput = z.infer<typeof getUserExpensesInputSchema>;

export const getUserEarningsInputSchema = z.object({
  user_id: z.number(),
  category: earningCategoryEnum.optional(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional()
});

export type GetUserEarningsInput = z.infer<typeof getUserEarningsInputSchema>;

export const getDashboardDataInputSchema = z.object({
  user_id: z.number(),
  start_date: z.coerce.date().optional(),
  end_date: z.coerce.date().optional()
});

export type GetDashboardDataInput = z.infer<typeof getDashboardDataInputSchema>;