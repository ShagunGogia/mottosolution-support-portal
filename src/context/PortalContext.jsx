import { useCallback, useMemo, useState } from 'react'
import PortalContext from './portal-context'
import { initialTickets } from '../data/mockTickets'
import { DEMO_ADMIN_EMAIL, DEMO_ADMIN_PASSWORD, isAdminUser } from '../data/mockUsers'

const isValidUser = (value) => value
  && typeof value.email === 'string'
  && ['Customer', 'Admin'].includes(value.role)
  && (value.role !== 'Admin' || isAdminUser(value))

export function PortalProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const savedUser = JSON.parse(localStorage.getItem('agrsoft-demo-user'))
      return isValidUser(savedUser) ? savedUser : null
    } catch {
      return null
    }
  })
  const [tickets, setTickets] = useState(initialTickets)

  const saveUser = useCallback((nextUser) => {
    setUser(nextUser)
    localStorage.setItem('agrsoft-demo-user', JSON.stringify(nextUser))
  }, [])

  const login = useCallback((email, password) => {
    const normalizedEmail = email.trim().toLowerCase()
    const isAdminEmail = normalizedEmail === DEMO_ADMIN_EMAIL
    if (isAdminEmail && password !== DEMO_ADMIN_PASSWORD) {
      return { success: false, error: 'Incorrect password for the admin account.' }
    }
    const isAdmin = isAdminEmail
    const nextUser = {
      email: normalizedEmail,
      role: isAdmin ? 'Admin' : 'Customer',
      ...(isAdmin && { demoAdminSession: 'demo-admin-v1' }),
      name: isAdmin
        ? 'AGRSoft Admin'
        : normalizedEmail === 'customer@agrsoft.com'
          ? 'AGRSoft Customer'
          : normalizedEmail.split('@')[0],
      ...(!isAdmin && normalizedEmail === 'customer@agrsoft.com' && {
        company: 'Contoso India Pvt. Ltd.',
        phone: '+91 98765 43210',
      }),
    }
    saveUser(nextUser)
    return { success: true, user: nextUser }
  }, [saveUser])

  const registerCustomer = useCallback((profile) => {
    const nextUser = {
      ...profile,
      email: profile.email.trim().toLowerCase(),
      role: 'Customer',
    }
    saveUser(nextUser)
    return nextUser
  }, [saveUser])

  const updateProfile = useCallback((updates) => {
    setUser((current) => {
      if (!current) return current
      const nextUser = { ...current, ...updates }
      localStorage.setItem('agrsoft-demo-user', JSON.stringify(nextUser))
      return nextUser
    })
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('agrsoft-demo-user')
  }, [])

  const createTicket = useCallback((ticket) => {
    const nextTicket = {
      ...ticket,
      id: `AGR-${new Date().getFullYear()}-${String(Date.now()).slice(-4)}`,
      customerEmail: user.email,
      customerName: user.name,
      status: 'New',
      engineer: 'Unassigned',
      createdAt: new Date().toISOString(),
      comments: [],
    }
    setTickets((current) => [nextTicket, ...current])
    return nextTicket
  }, [user])

  const updateTicket = useCallback((ticketId, updates) => {
    setTickets((current) => current.map((ticket) => (
      ticket.id === ticketId ? { ...ticket, ...updates } : ticket
    )))
  }, [])

  const addComment = useCallback((ticketId, text) => {
    setTickets((current) => current.map((ticket) => (
      ticket.id === ticketId
        ? { ...ticket, comments: [...ticket.comments, { author: user?.name || 'You', createdAt: new Date().toISOString(), text }] }
        : ticket
    )))
  }, [user])

  const value = useMemo(() => ({
    user, login, registerCustomer, updateProfile, logout, tickets, createTicket, updateTicket, addComment,
  }), [user, login, registerCustomer, updateProfile, logout, tickets, createTicket, updateTicket, addComment])
  return <PortalContext.Provider value={value}>{children}</PortalContext.Provider>
}
