"use client"

import * as React from "react"

import { cn } from "@n/lib/utils"
import { Icons } from "@n/components/ui/icons"
import { Button } from "@n/components/ui/button"
import {getProviders} from "next-auth/react";
import {SignInClient} from "@n/components/ui/auth-client";


// interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}
type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement> & {providers: ReturnType<typeof getProviders>}

export function UserAuthForm({ className, providers, ...props }: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false)

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
    }, 3000)
  }

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Log in with
          </span>
        </div>
      </div>

      <>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <Button variant="outline" type="button" disabled={isLoading}>
              {isLoading ? (
                <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Icons.google className="mr-2 h-4 w-4" />
              )}{" "}
              <SignInClient provider={provider} />
            </Button>
          </div>
        ))}
      </>
    </div>
  )
}
