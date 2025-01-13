import './Recipe.css'
import { Button, Card, Form } from "react-bootstrap";
import React, { useState } from "react";
import axios from "axios";

function Recipe(props) {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(props.title);
    const [description, setDescription] = useState(props.description);
    const [imageUrl, setImageUrl] = useState(props.image);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        const updatedRecipe = {
            name,
            description,
            imageUrl
        };

        try {
            console.log('updatedRecipe:', updatedRecipe);
            await axios.put(`http://localhost:8080/api/recipes/${props.id}`, updatedRecipe);
            console.log('updatedRecipe:', updatedRecipe);
            alert('Recipe updated successfully!');
            console.log('Recipe updated successfully!');
            setIsEditing(false);
            console.log('isEditing:', false);
        } catch (error) {
            console.error('Error updating recipe:', error);
            alert('Failed to update recipe.');
        }
    };

    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={imageUrl} />
            <Card.Body>
                {isEditing ? (
                    <>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                        </Form.Group>
                        <Button variant="primary" onClick={handleSave}>Save</Button>
                    </>
                ) : (
                    <>
                        <Card.Title>{name}</Card.Title>
                        {description}
                        <Button variant="primary" onClick={handleEdit}>Edit Details</Button>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

export default Recipe;