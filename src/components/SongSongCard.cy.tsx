import React from 'react'
import SongCard from './Song'

describe('<SongCard />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<SongCard />)
  })
})