import { useState, useEffect } from 'react'

export const useFilter = (filter, toys)=> {
  let filteredToys = toys

  useEffect(() => {
		Object.entries(filter).forEach(([key, value]) => {
			const values = value.split('&')
			filteredToys = filteredToys.filter(toy => values.includes(toy[key]))
		})
	})

  return filteredToys
}