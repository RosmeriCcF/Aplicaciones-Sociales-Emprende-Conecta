// pages/api/chat.js o app/api/chat/route.js (dependiendo si usas Pages Router o App Router)


import { GoogleGenerativeAI } from "@google/generative-ai";


// Inicializar Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


// Contexto de tu plataforma
const SYSTEM_CONTEXT = `
Eres un asistente virtual de "Emprende y Conecta", una plataforma que conecta emprendedores con clientes.


INFORMACIÓN DE LA PLATAFORMA:
- Nombre: Emprende y Conecta
- Propósito: Conectar emprendedores con clientes que necesiten sus servicios
- Categorías principales: Comida 🍔, Calzado 👟, Tecnología 📱, Joyería 💍, Postres 🍰


FUNCIONALIDADES:
1. Registro gratuito para emprendedores y clientes
2. Búsqueda de productos por categorías
3. Contacto directo entre compradores y vendedores
4. Perfil personalizado para cada emprendedor
5. Exploración de emprendimientos por categoría


PROCESO DE COMPRA:
1. El cliente encuentra el producto que le gusta
2. Contacta al vendedor através de la información provista
3. Coordina directamente con el vendedor los detalles de entrega y pago


CONSEJOS PARA EMPRENDEDORES:
- Investigar bien el mercado
- Crear un plan de negocio sólido
- Aprovechar las redes sociales para promocionarse
- No temer pedir ayuda


INSTRUCCIONES:
- Responde de manera amigable y profesional
- Usa emojis relevantes moderadamente
- Si no sabes algo específico, sugiere contactar al soporte
- Mantén las respuestas concisas pero informativas
- Enfócate en ser útil para ambos: emprendedores y clientes
- Siempre menciona que es gratis registrarse
`;


// // Si usas App Router (app/api/chat/route.js), usa esta versión:


export async function POST(request) {
    try {
        const { message, conversationHistory = [] } = await request.json();


        if (!message) {
            return Response.json({ error: "Mensaje requerido" }, { status: 400 });
        }


        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            generationConfig: {
                temperature: 0.7,
                topK: 40,
                topP: 0.95,
                maxOutputTokens: 500,
            },
        });


        let conversationText = SYSTEM_CONTEXT + "\n\n";


        const recentHistory = conversationHistory.slice(-5);
        recentHistory.forEach((msg) => {
            conversationText += `${msg.sender === "user" ? "Cliente" : "Asistente"
                }: ${msg.text}\n`;
        });


        conversationText += `Cliente: ${message}\nAsistente:`;


        const result = await model.generateContent(conversationText);
        const response = await result.response;
        const botReply = response.text();


        return Response.json({
            reply: botReply.trim(),
            success: true,
        });
    } catch (error) {
        console.error("Error con Gemini:", error);


        const fallbackResponse =
            "Disculpa, estoy teniendo problemas técnicos. Por favor, selecciona una de las opciones rápidas o intenta reformular tu pregunta. 🤔";


        return Response.json(
            {
                reply: fallbackResponse,
                success: false,
            },
            { status: 500 }
        );
    }
}





