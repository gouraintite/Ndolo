import { describe, it, expect } from 'vitest'
import { canCreateCagnotte, labelFor } from './trustLevel'

describe('canCreateCagnotte', () => {
  it('allows verified (L2)', () => expect(canCreateCagnotte('verified')).toBe(true))
  it('allows certified (L3)', () => expect(canCreateCagnotte('certified')).toBe(true))
  it('blocks unverified (L0)', () => expect(canCreateCagnotte('unverified')).toBe(false))
})

describe('labelFor', () => {
  it('returns French label for each level', () => {
    expect(labelFor('unverified')).toBe('Non vérifié')
    expect(labelFor('verified')).toBe('Vérifié')
    expect(labelFor('certified')).toBe('Certifié transparent')
  })
})
