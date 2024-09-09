import React from 'react'
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'



const TableComponent = ({ data, handleRowClick }: { data: any, handleRowClick: (id: string) => void }) => {
  
  return (
    <>
        <Paper sx={{ marginTop: '80px', width: '80%', borderRadius: '15px', overflow: 'hidden', boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}>
          <Table sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>Author</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#333' }}>Upvotes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((row: any) => (
                <TableRow 
                  key={row.post_id} 
                  onClick={() => handleRowClick(row.post_id)}
                  sx={{ 
                    '&:hover': { 
                      backgroundColor: '#f0f7ff',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s'
                    }
                  }}
                >
                  <TableCell sx={{ color: '#555' }}>{row.username}</TableCell>
                  <TableCell sx={{ color: '#555', fontWeight: 'medium' }}>{row.title}</TableCell>
                  <TableCell sx={{ color: '#555' }}>
                    <span style={{ 
                      backgroundColor: '#e0f2f1', 
                      padding: '5px 10px', 
                      borderRadius: '15px',
                      fontWeight: 'bold'
                    }}>
                      {row.upvotes}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
    </>
  )
}

export default TableComponent