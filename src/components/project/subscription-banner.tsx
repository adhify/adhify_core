"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard, AlertTriangle, Crown } from "lucide-react";

interface SubscriptionBannerProps {
  plan: "free" | "pro" | "enterprise";
  usage: {
    projects: { current: number; limit: number };
    apps: { current: number; limit: number };
    databases: { current: number; limit: number };
  };
}

export function SubscriptionBanner({ plan, usage }: SubscriptionBannerProps) {
  const isNearLimit = (current: number, limit: number) => {
    return current / limit >= 0.8;
  };

  const isAtLimit = (current: number, limit: number) => {
    return current >= limit;
  };

  const getPlanIcon = () => {
    switch (plan) {
      case "free":
        return <AlertTriangle className="h-4 w-4" />;
      case "pro":
        return <Crown className="h-4 w-4" />;
      case "enterprise":
        return <Crown className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const showUpgradePrompt =
    plan === "free" &&
    (isNearLimit(usage.projects.current, usage.projects.limit) ||
      isNearLimit(usage.apps.current, usage.apps.limit) ||
      isNearLimit(usage.databases.current, usage.databases.limit));

  if (!showUpgradePrompt && plan !== "free") return null;

  return (
    <Alert className="mb-6 border-yellow-200 bg-yellow-50">
      <div className="flex items-center gap-2">
        {getPlanIcon()}
        <AlertDescription className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">
                {plan === "free"
                  ? "Free Plan Limits"
                  : `${String(plan).charAt(0).toUpperCase() + String(plan).slice(1)} Plan`}
              </p>
              <div className="mt-2 space-y-2">
                <div className="flex items-center gap-4 text-sm">
                  <span className="w-20">Projects:</span>
                  <div className="max-w-32 flex-1">
                    <Progress
                      value={
                        (usage.projects.current / usage.projects.limit) * 100
                      }
                      className="h-2"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {usage.projects.current}/{usage.projects.limit}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="w-20">Apps:</span>
                  <div className="max-w-32 flex-1">
                    <Progress
                      value={(usage.apps.current / usage.apps.limit) * 100}
                      className="h-2"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {usage.apps.current}/{usage.apps.limit}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="w-20">Databases:</span>
                  <div className="max-w-32 flex-1">
                    <Progress
                      value={
                        (usage.databases.current / usage.databases.limit) * 100
                      }
                      className="h-2"
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {usage.databases.current}/{usage.databases.limit}
                  </span>
                </div>
              </div>
            </div>
            {plan === "free" && (
              <Button size="sm" className="gap-2">
                <CreditCard className="h-4 w-4" />
                Upgrade Plan
              </Button>
            )}
          </div>
        </AlertDescription>
      </div>
    </Alert>
  );
}
