/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [view, setView] = useState('sign-in')
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    checkUserState();
  })

  const checkUserState = async () => {
    let user;
    try {
      const {data}  = await supabase.auth.getUser();
      user = data.user
    } catch ( error ) {
      console.log(error)
    }

    if(user) {
      setView("logged-in")
    } 
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push("/")
    }
  }

  const handleSignIn = async (e) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/')
    }
  }

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message)
    } else {
      setView('sign-in')
    }
  }

  return (
    <div className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2">
      {view === 'logged-in' ? (
        <div>
          <p>Welcome, {email}</p>
          <button onClick={handleSignOut}>Log out</button>
        </div>
      ) : (
        <form
          className="flex-1 flex flex-col w-full max-w-sm justify-center gap-2"
          onSubmit={view === 'sign-in' ? handleSignIn : handleSignUp}
        >
          {error && <p>{error}</p>}
          <label className="text-md text-neutral-400" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 text-neutral-100"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="you@example.com"
          />
          <label className="text-md text-neutral-400" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 text-neutral-100"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="••••••••"
          />
          {view === 'sign-in' ? (
            <>
              <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
                Sign In
              </button>
              <p className="text-sm text-neutral-500 text-center">
                Don't have an account?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView('sign-up')}
                >
                  Sign Up Now
                </button>
              </p>
            </>
          ) : (
            <>
              <button className="bg-green-700 rounded px-4 py-2 text-neutral-200 mb-6">
                Sign Up
              </button>
              <p className="text-sm text-neutral-500 text-center">
                Already have an account?
                <button
                  className="ml-1 text-white underline"
                  onClick={() => setView('sign-in')}
                >
                  Sign In Now
                </button>
              </p>
            </>
          )}
        </form>
      )}
    </div>
  )
}
