import React from 'react'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'



const TableComponent = ({ data, handleRowClick }: { data: any, handleRowClick: (id: string) => void }) => {
  
  return (
    <>
        <Paper sx={{ marginTop: '80px', width: '80%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Author</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Upvotes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => (
                <TableRow key={row.post_id} onClick={() => handleRowClick(row.post_id)}>
                  <TableCell>{row.username}</TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.upvotes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
    </>
  )
}

export default TableComponent