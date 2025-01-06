import React, { useState } from 'react';
import './AddRecipe.css';
import { useForm } from "react-hook-form";
import { Form, Button, Col, Row } from 'react-bootstrap';
import axios from "axios";
import AddIngredient from "../AddIngredient/AddIngredient";

const baseURL = "http://localhost:8080/api/recipes";

function AddRecipe() {
    const [ingredients, setIngredients] = useState([])
    const [formData, setFormData] = useState({
        "name": '',
        "description": '',
        "imageUrl": '',
        "ingredients": [],
        "id": null
    })

    const [listId, setListId] = useState(1)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const addIngredient = () => {
        setFormData(({
            ...formData, ingredients: [
                ...formData.ingredients, {
                    listId: listId,
                    ingredient: '',
                    unit: 'PIECE',
                    quantity: ''
                }
            ]
        }))
        setListId(listId + 1)
    }

    const updateIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.map((ingredient) => {
            if (ingredient.listId === ingredientObj.listId) {
                return ingredientObj
            }
            return ingredient
        })
        setFormData({ ...formData, ingredients: updatedIngredients })
    }

    const removeIngredient = (ingredientObj) => {
        const updatedIngredients = formData.ingredients.filter((ingredient) => ingredient.listId !== ingredientObj.listId)
        setFormData({ ...formData, ingredients: updatedIngredients })
    }

    const renderIngredients = formData.ingredients.map(ingredient => <AddIngredient
        key={ingredient.listId}
        ingredient={ingredient}
        ingredients={ingredients}
        listId={listId - 1}
        updateIngredient={updateIngredient}
        removeIngredient={removeIngredient}
    />)

    const onSubmit = async (data) => {
        const recipeData = {
            ...formData,
            name: data.name,
            description: data.description,
            imageUrl: data.imageUrl
        }
        try {
            await axios.post(baseURL, recipeData);
            alert('Recipe added successfully!');
        } catch (error) {
            console.error('Error adding recipe:', error);
            alert('Failed to add recipe.');
        }
    }

    return (
        <>
            <div className="bg">
                <div className="m-3">
                    <h1 className="h3 bg-dark text-bg-primary mt-2">Add Recipe</h1>
                    <Form onSubmit={handleSubmit(onSubmit)}>
                        <Form.Group className="mb-1" controlId="formBasicName">
                            <Form.Label>Recipe Name:</Form.Label>
                            <Form.Control placeholder="Name" {...register('name', { required: true })} />
                            {errors.name && <p>Name is required</p>}
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicDescription">
                            <Form.Label>Description:</Form.Label>
                            <Form.Control placeholder="Description" {...register('description', { required: true })} />
                            {errors.description && <p>Description is required</p>}
                        </Form.Group>
                        <Form.Group className="mb-1 mb-5" controlId="formBasicImageUrl">
                            <Form.Label>Image URL:</Form.Label>
                            <Form.Control placeholder="URL" {...register('imageUrl', { required: true })} />
                            {errors.imageUrl && <p>Image URL is required</p>}
                        </Form.Group>
                        <Row>
                            <Col>Ingredient</Col>
                            <Col>Unit</Col>
                            <Col>Quantity</Col>
                            <Col xs={1}></Col>
                        </Row>
                        <hr />
                        <Row>
                            <br></br>
                        </Row>
                        {renderIngredients}
                        <Row>
                            <br></br>
                            <Button
                                variant='warning'
                                onClick={addIngredient}
                                className="mt-1"
                            >Add Ingredient</Button>
                        </Row>
                        <Button variant="primary" type="submit" className="mb-5">
                            Submit
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default AddRecipe;