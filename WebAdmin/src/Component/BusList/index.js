import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

const BusList = () =>{
    return(
        <>
            <TableContainer className="light-grey-bg" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                ID
                            </TableCell>
                             <TableCell>
                                OperatingTime
                            </TableCell>
                             <TableCell>
                                TimeDistance
                            </TableCell>
                             <TableCell>
                                Name
                            </TableCell>
                             <TableCell>
                                Prices
                            </TableCell>
                             <TableCell>
                                Seats
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
export default BusList;