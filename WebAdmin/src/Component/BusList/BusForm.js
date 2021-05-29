import {Button, FormControl, Input } from '@material-ui/core';
import React from 'react'
import styled from "styled-components";
import addbus from '../assets/addbus1.png'

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const BusForm = () =>{
    return (
        <div className="d-flex">
            <FormControl>
                <div className="d-block px-4">
                    <div className="mt-2">
                    <Label for="operatingtime">Operating Time</Label>
                    <Input
                        id="operating"
                        fullWidth
                        disableUnderline
                        inputProps={{className: "grey-200-bg border p-2 rounded"}}
                    />
                    </div>
                    <div className="mt-2">
                        <Label for="operatingtime">Time Distance</Label>
                        <Input
                            id="operating"
                            fullWidth
                            disableUnderline
                            inputProps={{className: "grey-200-bg border p-2 rounded"}}
                        />
                    </div>
                    <div className="mt-2">
                        <Label for="operatingtime">Name</Label>
                        <Input
                            id="operating"
                            fullWidth
                            disableUnderline
                            inputProps={{className: "grey-200-bg border p-2 rounded"}}
                        />
                    </div>
                    <div className="mt-2">
                        <Label for="operatingtime">Price</Label>
                        <Input
                            id="operating"
                            fullWidth
                            disableUnderline
                            inputProps={{className: "grey-200-bg border p-2 rounded"}}
                        />
                    </div>
                    <div className="mt-2">
                        <Label for="operatingtime">Seat</Label>
                        <Input
                            id="operating"
                            fullWidth
                            disableUnderline
                            inputProps={{className: "grey-200-bg border p-2 rounded"}}
                        />
                    </div>
                    <Button variant="contained" color="primary" className="mt-4 w-50 mx-5">Submit</Button>
                </div>
            </FormControl>
            <img className="w-50 h-50" src={addbus} alt="addbus"/>
        </div>
    )
}
export default BusForm;