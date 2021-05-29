import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@material-ui/core'
import React from 'react'

const BusStopList = () =>{
    return(
        <>
            <TableContainer className="light-grey-bg" component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Name
                            </TableCell>
                             <TableCell>
                                Location Name
                            </TableCell>
                             <TableCell>
                                Latitude
                            </TableCell>
                             <TableCell>
                                Longtidude
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
export default BusStopList;