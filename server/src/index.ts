import { initTRPC } from '@trpc/server';
import { createHTTPServer } from '@trpc/server/adapters/standalone';
import 'dotenv/config';
import cors from 'cors';
import superjson from 'superjson';
import { z } from 'zod';

// Import schemas
import { 
  createUserInputSchema,
  createExpenseInputSchema, 
  createEarningInputSchema,
  createBudgetInputSchema,
  updateBudgetInputSchema,
  getUserExpensesInputSchema,
  getUserEarningsInputSchema,
  getDashboardDataInputSchema
} from './schema';

// Import handlers
import { createUser } from './handlers/create_user';
import { createExpense } from './handlers/create_expense';
import { createEarning } from './handlers/create_earning';
import { createBudget } from './handlers/create_budget';
import { updateBudget } from './handlers/update_budget';
import { getUserExpenses } from './handlers/get_user_expenses';
import { getUserEarnings } from './handlers/get_user_earnings';
import { getUserBudgets } from './handlers/get_user_budgets';
import { getDashboardData } from './handlers/get_dashboard_data';
import { getUsers } from './handlers/get_users';

const t = initTRPC.create({
  transformer: superjson,
});

const publicProcedure = t.procedure;
const router = t.router;

const appRouter = router({
  // Health check endpoint
  healthcheck: publicProcedure.query(() => {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }),

  // User management
  createUser: publicProcedure
    .input(createUserInputSchema)
    .mutation(({ input }) => createUser(input)),
  
  getUsers: publicProcedure
    .query(() => getUsers()),

  // Expense management  
  createExpense: publicProcedure
    .input(createExpenseInputSchema)
    .mutation(({ input }) => createExpense(input)),
  
  getUserExpenses: publicProcedure
    .input(getUserExpensesInputSchema)
    .query(({ input }) => getUserExpenses(input)),

  // Earning management
  createEarning: publicProcedure
    .input(createEarningInputSchema)
    .mutation(({ input }) => createEarning(input)),
  
  getUserEarnings: publicProcedure
    .input(getUserEarningsInputSchema)
    .query(({ input }) => getUserEarnings(input)),

  // Budget management
  createBudget: publicProcedure
    .input(createBudgetInputSchema)
    .mutation(({ input }) => createBudget(input)),
  
  updateBudget: publicProcedure
    .input(updateBudgetInputSchema)
    .mutation(({ input }) => updateBudget(input)),
  
  getUserBudgets: publicProcedure
    .input(z.object({ userId: z.number() }))
    .query(({ input }) => getUserBudgets(input.userId)),

  // Dashboard data
  getDashboardData: publicProcedure
    .input(getDashboardDataInputSchema)
    .query(({ input }) => getDashboardData(input)),
});

export type AppRouter = typeof appRouter;

async function start() {
  const port = process.env['SERVER_PORT'] || 2022;
  const server = createHTTPServer({
    middleware: (req, res, next) => {
      cors()(req, res, next);
    },
    router: appRouter,
    createContext() {
      return {};
    },
  });
  server.listen(port);
  console.log(`Finance Management TRPC server listening at port: ${port}`);
}

start();