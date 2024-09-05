<script>
  import { useChat } from '@ai-sdk/svelte';
  import { TextInput, Button } from "carbon-components-svelte";
  import Send from "carbon-icons-svelte/lib/Send.svelte";

  const { input, handleSubmit, messages } = useChat();

  let chatContainer;

  $: if (chatContainer) {
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }
</script>

<main class="chat-container">
  <div class="chat-messages" bind:this={chatContainer}>
    {#each $messages as message}
      <div class="message {message.role}">
        <p>{message.content}</p>
      </div>
    {/each}
  </div>
  <form on:submit|preventDefault={handleSubmit} class="chat-input">
    <TextInput
      bind:value={$input}
      placeholder="Type a message..."
      size="xl"
    />
    <Button icon={Send} type="submit" size="field">Send</Button>
  </form>
</main>

<style>
  .chat-container {
    max-width: 800px;
    height: 600px;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    background-color: #262626;
    border-radius: 8px;
    overflow: hidden;
  }

  .chat-messages {
    flex-grow: 1;
    overflow-y: auto;
    padding: 1rem;
    display: flex;
    flex-direction: column;
  }

  .message {
    max-width: 70%;
    margin-bottom: 1rem;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    word-wrap: break-word;
  }

  .message.user {
    align-self: flex-end;
    background-color: #0f62fe;
    color: white;
    border-bottom-right-radius: 0.25rem;
  }

  .message.assistant {
    align-self: flex-start;
    background-color: #393939;
    color: white;
    border-bottom-left-radius: 0.25rem;
  }

  .chat-input {
    display: flex;
    padding: 1rem;
    background-color: #393939;
  }

  :global(.chat-input .bx--text-input) {
    flex-grow: 1;
    margin-right: 0.5rem;
  }

  :global(.chat-input .bx--btn) {
    min-width: auto;
  }
</style>