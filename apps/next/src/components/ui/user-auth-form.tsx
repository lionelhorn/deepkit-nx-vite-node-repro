"use client"

import * as React from "react"

import { cn } from "@/lib/utils"
import { Icons } from "@/components/ui/icons"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {getProviders} from "next-auth/react";
import {SignInClient} from "@/components/ui/auth-client";


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
      {/*<form onSubmit={onSubmit}>*/}
      {/*  <div className="grid gap-2">*/}
      {/*    <div className="grid gap-1">*/}
      {/*      <Label className="sr-only" htmlFor="email">*/}
      {/*        Email*/}
      {/*      </Label>*/}
      {/*      <Input*/}
      {/*        id="email"*/}
      {/*        placeholder="name@example.com"*/}
      {/*        type="email"*/}
      {/*        autoCapitalize="none"*/}
      {/*        autoComplete="email"*/}
      {/*        autoCorrect="off"*/}
      {/*        disabled={isLoading}*/}
      {/*      />*/}
      {/*    </div>*/}
      {/*    <Button disabled={isLoading}>*/}
      {/*      {isLoading && (*/}
      {/*        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />*/}
      {/*      )}*/}
      {/*      Sign In with Email*/}
      {/*    </Button>*/}
      {/*  </div>*/}
      {/*</form>*/}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            {/*Or continue with*/}
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
