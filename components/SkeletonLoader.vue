<template>
  <div class="skeleton-loader">
    <div class="skeleton-image"></div>
    <div class="skeleton-content">
      <div class="skeleton-title"></div>
      <div class="skeleton-description"></div>
      <div class="skeleton-meta">
        <div class="skeleton-category"></div>
        <div class="skeleton-date"></div>
        <div class="skeleton-stats"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-loader {
  display: flex;
  background-color: var(--background-color-light, #1f2937);
  border-radius: 0.5rem;
  overflow: hidden;
  margin-bottom: 1rem;
}

.skeleton-image {
  flex: 0 0 210px;
  height: 150px;
  background-color: var(--skeleton-color, #374151);
}

.skeleton-content {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.skeleton-title,
.skeleton-description,
.skeleton-meta > div {
  background-color: var(--skeleton-color, #374151);
  border-radius: 0.25rem;
  margin-bottom: 0.5rem;
}

.skeleton-title {
  height: 1.5rem;
  width: 80%;
}

.skeleton-description {
  height: 1rem;
  width: 90%;
  margin-bottom: 1rem;
}

.skeleton-meta {
  display: flex;
  justify-content: space-between;
}

.skeleton-category {
  height: 1rem;
  width: 20%;
}

.skeleton-date {
  height: 1rem;
  width: 30%;
}

.skeleton-stats {
  height: 1rem;
  width: 30%;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

.skeleton-loader * {
  animation: pulse 1.5s ease-in-out infinite;
}

@media (max-width: 640px) {
  .skeleton-loader {
    flex-direction: column;
  }

  .skeleton-image {
    width: 100%;
    height: 200px;
  }
}
</style>