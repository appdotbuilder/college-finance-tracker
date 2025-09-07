import { serial, text, pgTable, timestamp, numeric, integer, pgEnum } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

// Define PostgreSQL enums
export const expenseCategoryEnum = pgEnum('expense_category', [
  'food',
  'transport', 
  'tuition',
  'entertainment',
  'rent',
  'other'
]);

export const earningCategoryEnum = pgEnum('earning_category', [
  'salary',
  'scholarship', 
  'parents_allowance',
  'freelance',
  'other'
]);

export const budgetPeriodEnum = pgEnum('budget_period', [
  'weekly',
  'monthly', 
  'yearly'
]);

// Users table
export const usersTable = pgTable('users', {
  id: serial('id').primaryKey(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Expenses table
export const expensesTable = pgTable('expenses', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  category: expenseCategoryEnum('category').notNull(),
  description: text('description'), // Nullable by default
  date: timestamp('date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Earnings table
export const earningsTable = pgTable('earnings', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  category: earningCategoryEnum('category').notNull(),
  description: text('description'), // Nullable by default
  date: timestamp('date').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

// Budgets table
export const budgetsTable = pgTable('budgets', {
  id: serial('id').primaryKey(),
  user_id: integer('user_id').notNull().references(() => usersTable.id, { onDelete: 'cascade' }),
  category: expenseCategoryEnum('category').notNull(),
  amount: numeric('amount', { precision: 10, scale: 2 }).notNull(),
  period: budgetPeriodEnum('period').notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

// Define relations
export const usersRelations = relations(usersTable, ({ many }) => ({
  expenses: many(expensesTable),
  earnings: many(earningsTable),
  budgets: many(budgetsTable),
}));

export const expensesRelations = relations(expensesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [expensesTable.user_id],
    references: [usersTable.id],
  }),
}));

export const earningsRelations = relations(earningsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [earningsTable.user_id],
    references: [usersTable.id],
  }),
}));

export const budgetsRelations = relations(budgetsTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [budgetsTable.user_id],
    references: [usersTable.id],
  }),
}));

// TypeScript types for the table schemas
export type User = typeof usersTable.$inferSelect;
export type NewUser = typeof usersTable.$inferInsert;

export type Expense = typeof expensesTable.$inferSelect;
export type NewExpense = typeof expensesTable.$inferInsert;

export type Earning = typeof earningsTable.$inferSelect;
export type NewEarning = typeof earningsTable.$inferInsert;

export type Budget = typeof budgetsTable.$inferSelect;
export type NewBudget = typeof budgetsTable.$inferInsert;

// Export all tables and relations for proper query building
export const tables = { 
  users: usersTable,
  expenses: expensesTable, 
  earnings: earningsTable,
  budgets: budgetsTable
};