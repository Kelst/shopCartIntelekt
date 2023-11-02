import React from 'react'
import { useParams } from 'react-router-dom';

export default function Category() {
  let { id } = useParams(); useParams
  return (
    <div>Category ${id}</div>
  )
}
