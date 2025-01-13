import React from 'react';
import { Button, Col, Form, Row } from "react-bootstrap";

const AddIngredient = ({ ingredient, updateIngredient, removeIngredient }) => {
    const handleChange = (field, value) => {
        updateIngredient({ ...ingredient, [field]: value });
    };

    return (
        <Row className="mb-3">
            <Col>
                <Form.Group controlId="formBasicName">
                    <Form.Control
                        placeholder="Name"
                        value={ingredient.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="formBasicUnit">
                    <Form.Select
                        value={ingredient.unit}
                        onChange={(e) => handleChange('unit', e.target.value)}
                    >
                        <option value="PIECE">Piece</option>
                        <option value="GRAMM">Gramm</option>
                        <option value="KILOGRAMM">Kilogramm</option>
                        <option value="LITRE">Litre</option>
                        <option value="DECILITRE">Decilitre</option>
                    </Form.Select>
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="quantity">
                    <Form.Control
                        type="number"
                        placeholder="Amount"
                        value={ingredient.amount}
                        onChange={(e) => handleChange('amount', Number(e.target.value))}
                    />
                </Form.Group>
            </Col>
            <Col>
                <Form.Group controlId="comment">
                    <Form.Control
                        placeholder="Comment"
                        value={ingredient.comment}
                        onChange={(e) => handleChange('comment', e.target.value)}
                    />
                </Form.Group>
            </Col>
            <Col xs={1}>
                <Button
                    onClick={() => removeIngredient(ingredient)}
                    variant="outline-dark"
                >
                    x
                </Button>
            </Col>
        </Row>
    );
};

export default AddIngredient;