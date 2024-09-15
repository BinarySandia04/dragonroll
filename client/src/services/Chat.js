import { ref } from 'vue';
import { socket } from "./Socket";

let chatMessageId = 0;
const chat = ref([]);

socket.on('message', (data) => {
    // Add new chat message, ?
    if(chat.value.length > 0) if(chat.value[chat.value.length - 1].author == data.author){
        chat.value[chat.value.length - 1].chunkSize += 1;
        chat.value[chat.value.length - 1].chunks.push({
            id: chat.value[chat.value.length - 1].chunkSize,
            type: data.type ? data.type : 'text',
            content: data.content
        });
        return;
    }

    chatMessageId += 1;
    chat.value.push({
        id: chatMessageId,
        author: data.author,
        chunkSize: 1,
        chunks: [
            {
                id: 1,
                type: data.type ? data.type : 'text',
                content: data.content
            }
        ]
    });
});

export {
    chat
}