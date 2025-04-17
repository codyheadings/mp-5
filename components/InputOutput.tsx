"use client";
import {useState} from "react";
import createNewAlias from "@/lib/createNewAlias";
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 500px;
    margin: 20px auto;
`

const ErrorMessage = styled.p`
    color: #d32f2f;
    margin-top: 0.5rem;
`

const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
`

const Label = styled.label`
    margin-bottom: 0.5rem;
    font-weight: bold;
`

const Input = styled.input`
    padding: 0.75rem;
    font-size: 1rem;
    border-radius: 4px;
    border: 1px solid #ccc;
    background-color: white;
    color: #0a0a0a;
`

const Button = styled.button`
    background-color: #1976d2;
    color: white;
    padding: 0.75rem 0;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
    width: 80px;
    margin-top: 1rem;
  
    &:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
    }
`

export default function InputOutput() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState("");
    const [link, setLink] = useState("");

    return (
        <div>
            <Form
                onSubmit={async (event) => {
                    event.preventDefault();
                    const result = await createNewAlias(alias, url)
                    if (result.success) {
                        //print link
                        setError("");
                        setLink(`Your new URL is: ${window.location.origin}/r/${result.data?.alias}`);
                    } else {
                        setError(result.error || "An error occurred.");
                        setLink("")
                    }
                }}>

                <InputGroup>
                    <Label htmlFor="url-input">Enter Url:</Label>
                    <Input
                        id="url-input"
                        type="text"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </InputGroup>

                <InputGroup>
                    <Label htmlFor="alias-input">Enter shortened alias:</Label>
                    <Input
                        id="alias-input"
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                    />
                </InputGroup>

                <div>
                    <ErrorMessage>{error}</ErrorMessage>
                    <p>{link}</p>
                    <Button
                        type="submit"
                        disabled={alias === "" || url === ""}
                    >Create
                    </Button>
                </div>
            </Form>
        </div>
    );
}