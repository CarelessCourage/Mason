<template>
  <div class="checkbox">
    <p><slot></slot></p>
    <input type="checkbox">
    <div class="checkmark u-panel hover active"></div>
  </div>
</template>

<style lang="scss">

.checkbox input[type="checkbox"] {
  -webkit-appearance: none;
  appearance: none;
  margin: 0;
}

/* Customize the label (the container) */
.checkbox {
  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  cursor: pointer;
  user-select: none;
  flex-direction: row-reverse;
  gap: var(--space-familiar);

  min-width: min-content;
  height: var(--brick);
}

/* Hide the browser's default radio button */
.checkbox input {
  cursor: pointer;
  height: 100%;
  //opacity: 0;
  position: absolute;
  width: 100%;
  z-index: 10;
}

/* Create a custom radio button */
.checkbox .checkmark {
  aspect-ratio: 1 / 1;
  padding: 0px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

}

.checkbox .checkmark:before {
  position: absolute;
  content: "";
  opacity: 1;
  width: 50%;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius, 50%);
  background-color: var(--background);
  transition: .2s;
}

.checkbox input:checked ~ .checkmark:before {
  width: 75%;
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkbox .checkmark:after {
  content: "";
  opacity: 1;
  width: 50%;
  aspect-ratio: 1 / 1;
  border-radius: var(--radius, 50%);
  background-color: var(--foreground);
  transition: .2s;
  transform: scale(0);
}

/* Show the indicator (dot/circle) when checked */
.checkbox input:checked ~ .checkmark:after {
  transform: scale(1);
}

.checkbox input:active ~ .checkmark:after {
  background-color: var(--brand);
}
</style>