import {Button, FormControl, Input } from '@material-ui/core';
import React from 'react'
import styled from "styled-components";
import addbusstop from '../assets/busstop.png'

const Label = styled.label`
    font-size:13px;
    font-weight:600;
`

const BusStopForm = () =>{
    return (
        <div className="d-flex">
            <FormControl>
                <div className="d-block px-4">
                    <div className="mt-2">
                    <Label for="operatingtime">Name BusStop</Label>
                    <Input
                        id="name"
                        fullWidth
                        disableUnderline
                        inputProps={{className: "grey-200-bg border p-2 rounded"}}
                    />
                    </div>
                    <div className="mt-2">
                        <Label for="operatingtime">Location Name</Label>
                        <Input
                            id="location"
                            fullWidth
                            disableUnderline
                            inputProps={{className: "grey-200-bg border p-2 rounded"}}
                        />
                    </div>
                    <div className="mt-2">
                        <Label for="operatingtime">Latitude</Label>
                        <Input
                            id="latitude"
                            fullWidth
                            disableUnderline
                            inputProps={{className: "grey-200-bg border p-2 rounded"}}
                        />
                    </div>
                    <div className="mt-2">
                        <Label for="operatingtime">Longtitude</Label>
                        <Input
                            id="longtitude"
                            fullWidth
                            disableUnderline
                            inputProps={{className: "grey-200-bg border p-2 rounded"}}
                        />
                    </div>
                    
                    <Button variant="contained" color="primary" className="mt-4 w-50 mx-5">Submit</Button>
                </div>
            </FormControl>
            <img className="w-50 h-50" src={addbusstop} alt="addbus"/>
        </div>
    )
}
export default BusStopForm;