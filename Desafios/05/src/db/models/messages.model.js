import mongoose from 'mongoose';

// la estrictura se va a llamar schema

const messagesSchema = new mongoose.Schema({});

export const messagesModel = mongoose.model('messages', messagesSchema); // metodo para crear una coleccion/modelo
