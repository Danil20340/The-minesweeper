<template>
  <BPopover :click="true" :close-on-hide="true" :delay="{ show: 0, hide: 0 }">
    <template #target>
      <BButton><i class="bi bi-info-circle-fill"></i></BButton>
    </template>
    <div style="max-width: 250px">
      <strong>🎮 Управление</strong><br><br>
      <strong>👆 Одиночный клик / тап:</strong> открыть клетку<br>
      <strong>📍 Правый клик / двойной тап:</strong> поставить или сменить метку (🚩 → ❓ → ❌)<br>
      <strong>🖱 Средняя кнопка /долгий тап (0.5 сек):</strong> по уже открытой клетке с числом —
      попытка открыть все соседние клетки, если число флажков совпадает с цифрой
    </div>
  </BPopover>
</template>