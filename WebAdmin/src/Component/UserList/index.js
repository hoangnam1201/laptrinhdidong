import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

const UserList = () =>{
    return(
        <>
            <TableContainer className="light-grey-bg" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                FullName
                            </TableCell>
                             <TableCell>
                                Email
                            </TableCell>
                             <TableCell>
                                Password
                            </TableCell>
                             <TableCell>
                                Role
                            </TableCell>
                             <TableCell>
                                
                            </TableCell>
                             <TableCell>
                            
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="bg-white">
                        <TableRow>

                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
export default UserList;