<template>
  <div class="f-profile u-panel">
    <div class="image">
      <img width="100" height="100" src="https://images.unsplash.com/photo-1537141560831-47a16bfdabe2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80" alt="profile image">
    </div>
    <p>Jane Doe</p>
  </div>
</template>

<style lang="scss">
  .f-profile {
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--space-intimate);
    max-width: max-content;
    padding: 0px 30px 0px 15px;
    height: calc(2 * var(--brick));

    .image {
      background-color: var(--background);
      border-radius: var(--radius, 50%);
      height: 70%;
      aspect-ratio: 1 / 1;
    }

    .image img {
      object-fit: cover;
      border-radius: var(--radius, 50%);
      height: 100%;
      width: 100%;
      transform: scale(0.8);
    }
  }
</style>