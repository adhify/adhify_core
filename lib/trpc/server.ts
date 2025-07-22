import { initTRPC, TRPCError } from "@trpc/server"
import { z } from "zod"
import { supabase } from "@/lib/supabase/client"

// Initialize tRPC
const t = initTRPC.create()

// Export reusable router and procedure helpers
export const router = t.router
export const publicProcedure = t.procedure

// Add authentication procedures to the existing router
export const appRouter = router({
  // Existing procedures
  hello: publicProcedure.input(z.object({ name: z.string() })).query(({ input }) => {
    return {
      greeting: `Hello ${input.name}!`,
    }
  }),

  getUsers: publicProcedure.query(() => {
    // Mock data - replace with your database calls
    return [
      { id: 1, name: "Alice", email: "alice@example.com" },
      { id: 2, name: "Bob", email: "bob@example.com" },
    ]
  }),

  createUser: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    )
    .mutation(({ input }) => {
      // Mock creation - replace with your database calls
      const newUser = {
        id: Math.floor(Math.random() * 1000),
        name: input.name,
        email: input.email,
      }
      return newUser
    }),

  // Authentication procedures
  signUp: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(6),
        name: z.string().min(1).optional(),
      }),
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase.auth.signUp({
        email: input.email,
        password: input.password,
        options: {
          data: {
            name: input.name,
          },
        },
      })

      if (error) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message,
        })
      }

      return {
        user: data.user,
        session: data.session,
        message: data.user?.email_confirmed_at
          ? "Account created successfully!"
          : "Please check your email to verify your account.",
      }
    }),

  signIn: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(1),
      }),
    )
    .mutation(async ({ input }) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      })

      if (error) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error.message,
        })
      }

      return {
        user: data.user,
        session: data.session,
        message: "Signed in successfully!",
      }
    }),

  signOut: publicProcedure.mutation(async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: error.message,
      })
    }

    return { message: "Signed out successfully!" }
  }),

  getCurrentUser: publicProcedure.query(async () => {
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser()

    if (error) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
        message: error.message,
      })
    }

    return { user }
  }),

  // New procedure from updates
  getProjects: publicProcedure.query(() => {
    // This would typically fetch from your database
    return [
      { id: "1", name: "Project 1", status: "active" },
      { id: "2", name: "Project 2", status: "inactive" },
    ]
  }),
})

export type AppRouter = typeof appRouter
