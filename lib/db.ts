import { prisma } from "./prisma"

// User Service
export const userService = {
  async create(data: {
    id: string
    email: string
    fullName?: string | null
    avatarUrl?: string | null
  }) {
    return prisma.user.create({
      data: {
        id: data.id,
        email: data.email,
        fullName: data.fullName,
        avatarUrl: data.avatarUrl,
      },
    })
  },

  async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        teamMemberships: {
          include: {
            team: {
              include: {
                subscription: true,
              },
            },
          },
        },
      },
    })
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    })
  },

  async update(
    id: string,
    data: Partial<{
      email: string
      fullName: string
      avatarUrl: string
    }>,
  ) {
    return prisma.user.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  },

  async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    })
  },
}

// Team Service
export const teamService = {
  async create(data: {
    name: string
    description?: string
    ownerId: string
  }) {
    return prisma.team.create({
      data: {
        name: data.name,
        description: data.description,
        ownerId: data.ownerId,
        members: {
          create: {
            userId: data.ownerId,
            role: "OWNER",
          },
        },
      },
      include: {
        members: {
          include: {
            user: true,
          },
        },
      },
    })
  },

  async findById(id: string) {
    return prisma.team.findUnique({
      where: { id },
      include: {
        members: {
          include: {
            user: true,
          },
        },
        projects: true,
        subscription: true,
      },
    })
  },

  async findByUserId(userId: string) {
    const memberships = await prisma.teamMembership.findMany({
      where: { userId },
      include: {
        team: {
          include: {
            subscription: true,
            _count: {
              select: {
                projects: true,
                members: true,
              },
            },
          },
        },
      },
    })
    return memberships.map((m) => ({
      ...m.team,
      role: m.role,
    }))
  },

  async addMember(teamId: string, userId: string, role: "OWNER" | "ADMIN" | "MEMBER" = "MEMBER") {
    return prisma.teamMembership.create({
      data: {
        teamId,
        userId,
        role,
      },
    })
  },

  async removeMember(teamId: string, userId: string) {
    return prisma.teamMembership.delete({
      where: {
        teamId_userId: {
          teamId,
          userId,
        },
      },
    })
  },

  async update(
    id: string,
    data: Partial<{
      name: string
      description: string
    }>,
  ) {
    return prisma.team.update({
      where: { id },
      data,
    })
  },

  async delete(id: string) {
    return prisma.team.delete({
      where: { id },
    })
  },
}

// Project Service
export const projectService = {
  async create(data: {
    name: string
    description?: string
    teamId: string
    repositoryUrl?: string
  }) {
    return prisma.project.create({
      data: {
        name: data.name,
        description: data.description,
        teamId: data.teamId,
        repositoryUrl: data.repositoryUrl,
        status: "ACTIVE",
      },
      include: {
        apps: true,
        databases: true,
        services: true,
      },
    })
  },

  async findById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        team: true,
        apps: true,
        databases: true,
        services: true,
        deployments: {
          orderBy: { createdAt: "desc" },
          take: 10,
        },
      },
    })
  },

  async findByTeamId(teamId: string) {
    return prisma.project.findMany({
      where: { teamId },
      include: {
        team: true,
        apps: true,
        databases: true,
        services: true,
        deployments: {
          orderBy: { createdAt: "desc" },
          take: 1,
        },
        _count: {
          select: {
            deployments: true,
          },
        },
      },
    })
  },

  async update(
    id: string,
    data: Partial<{
      name: string
      description: string
      repositoryUrl: string
      status: "ACTIVE" | "INACTIVE" | "ARCHIVED"
    }>,
  ) {
    return prisma.project.update({
      where: { id },
      data: {
        ...data,
        updatedAt: new Date(),
      },
    })
  },

  async delete(id: string) {
    return prisma.project.delete({
      where: { id },
    })
  },
}

// Server Service
export const serverService = {
  async create(data: {
    name: string
    provider: string
    region: string
    specs: any
    status?: "ACTIVE" | "INACTIVE" | "MAINTENANCE"
  }) {
    return prisma.server.create({
      data: {
        name: data.name,
        provider: data.provider,
        region: data.region,
        specs: data.specs,
        status: data.status || "ACTIVE",
      },
    })
  },

  async findAll() {
    return prisma.server.findMany({
      include: {
        allocations: {
          include: {
            subscription: {
              include: {
                team: true,
              },
            },
          },
        },
        _count: {
          select: {
            allocations: true,
          },
        },
      },
    })
  },

  async findById(id: string) {
    return prisma.server.findUnique({
      where: { id },
      include: {
        allocations: {
          include: {
            subscription: {
              include: {
                team: true,
              },
            },
          },
        },
      },
    })
  },

  async update(
    id: string,
    data: Partial<{
      name: string
      provider: string
      region: string
      specs: any
      status: "ACTIVE" | "INACTIVE" | "MAINTENANCE"
    }>,
  ) {
    return prisma.server.update({
      where: { id },
      data,
    })
  },

  async delete(id: string) {
    return prisma.server.delete({
      where: { id },
    })
  },
}

// Subscription Service
export const subscriptionService = {
  async create(data: {
    teamId: string
    planId: string
    status?: "ACTIVE" | "INACTIVE" | "CANCELLED"
  }) {
    return prisma.subscription.create({
      data: {
        teamId: data.teamId,
        planId: data.planId,
        status: data.status || "ACTIVE",
      },
      include: {
        plan: true,
        team: true,
      },
    })
  },

  async findByTeamId(teamId: string) {
    return prisma.subscription.findFirst({
      where: { teamId },
      include: {
        plan: true,
        allocations: {
          include: {
            server: true,
          },
        },
      },
    })
  },

  async update(
    id: string,
    data: Partial<{
      planId: string
      status: "ACTIVE" | "INACTIVE" | "CANCELLED"
    }>,
  ) {
    return prisma.subscription.update({
      where: { id },
      data,
    })
  },

  async delete(id: string) {
    return prisma.subscription.delete({
      where: { id },
    })
  },
}

// Additional Services
export const db = {
  user: {
    async findById(id: string) {
      return prisma.user.findUnique({
        where: { id },
      })
    },

    async findByEmail(email: string) {
      return prisma.user.findUnique({
        where: { email },
      })
    },

    async create(data: {
      id: string
      email: string
      fullName?: string | null
      avatarUrl?: string | null
    }) {
      return prisma.user.create({
        data,
      })
    },

    async update(id: string, data: {
      email?: string
      fullName?: string | null
      avatarUrl?: string | null
    }) {
      return prisma.user.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      })
    },

    async delete(id: string) {
      return prisma.user.delete({
        where: { id },
      })
    },
  },

  project: {
    async findByUserId(userId: string) {
      return prisma.project.findMany({
        where: { userId },
        include: {
          team: true,
          apps: true,
          databases: true,
          services: true,
          deployments: {
            orderBy: { createdAt: "desc" },
            take: 1,
          },
        },
      })
    },

    async findById(id: string) {
      return prisma.project.findUnique({
        where: { id },
        include: {
          team: true,
          apps: true,
          databases: true,
          services: true,
          deployments: {
            orderBy: { createdAt: "desc" },
          },
        },
      })
    },

    async create(data: {
      name: string
      description?: string
      userId: string
      teamId?: string
    }) {
      return prisma.project.create({
        data,
      })
    },

    async update(id: string, data: {
      name?: string
      description?: string
      status?: string
    }) {
      return prisma.project.update({
        where: { id },
        data: {
          ...data,
          updatedAt: new Date(),
        },
      })
    },

    async delete(id: string) {
      return prisma.project.delete({
        where: { id },
      })
    },
  },
}
