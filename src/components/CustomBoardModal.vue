<script setup lang="ts">
import { ref, computed } from 'vue'
import { defineModel } from 'vue'
import { useGameStore } from '@/stores/gameStore'
const modalVisible = defineModel<boolean>();
const gameStore = useGameStore()

// Поля для кастомного режима
const rows = ref<number | null>(null);
const cols = ref<number | null>(null);
const mines = ref<number | null>(null);
const timeLimit = ref<number | null>(null);

// Ограничения
const minSize = 5;
const maxSize = 50;

// Автоматический расчет времени
const autoTimeLimit = computed(() => {
    if (rows.value && cols.value) {
        return Math.round(rows.value * cols.value * 9.375);
    }
    return 60; // Значение по умолчанию
});

// Валидация
const isValidRows = computed(() => rows.value !== null && rows.value >= minSize && rows.value <= maxSize);
const isValidCols = computed(() => cols.value !== null && cols.value >= minSize && cols.value <= maxSize);
const isValidMines = computed(() => mines.value !== null && mines.value >= 1 && mines.value < (rows.value! * cols.value!));
const isValidTime = computed(() => { const time = timeLimit.value ?? autoTimeLimit.value; return time > 0; });

// Проверка на валидность всей формы
const isFormValid = computed(() => isValidRows.value && isValidCols.value && isValidMines.value && isValidTime.value);

// Отправка данных
const submitCustomGame = () => {
    if (!isFormValid.value) return;

    gameStore.width = rows.value!;
    gameStore.height = cols.value!;
    gameStore.mines = mines.value!;
    gameStore.elapsedTime = timeLimit.value!;

    modalVisible.value = false;
};
</script>

<template>
    <BModal v-model="modalVisible" centered title="Кастомный режим">
        <div>
            <label>Строки ({{ minSize }}-{{ maxSize }})</label>
            <BFormInput v-model.number="rows" :state="isValidRows" placeholder="Введите количество строк"
                type="number" />
            <BFormInvalidFeedback>Введите число от {{ minSize }} до {{ maxSize }}</BFormInvalidFeedback>
        </div>

        <div>
            <label>Колонки ({{ minSize }}-{{ maxSize }})</label>
            <BFormInput v-model.number="cols" :state="isValidCols" placeholder="Введите количество колонок"
                type="number" />
            <BFormInvalidFeedback>Введите число от {{ minSize }} до {{ maxSize }}</BFormInvalidFeedback>
        </div>

        <div>
            <label>Количество мин (1 - {{ rows && cols ? rows * cols - 1 : '?' }})</label>
            <BFormInput v-model.number="mines" :state="isValidMines" placeholder="Введите количество мин"
                type="number" />
            <BFormInvalidFeedback>Введите корректное количество мин</BFormInvalidFeedback>
        </div>

        <div>
            <label>Время (секунды) [по умолчанию: {{ autoTimeLimit }}]</label>
            <BFormInput v-model.number="timeLimit" :state="timeLimit !== null ? isValidTime : null"
                placeholder="Введите время (сек) или оставьте пустым" type="number" />
            <BFormInvalidFeedback>Введите положительное число</BFormInvalidFeedback>
        </div>

        <template #footer>
            <BButton variant="primary" :disabled="!isFormValid" @click="submitCustomGame">Применить</BButton>
            <BButton variant="secondary" @click="modalVisible = false">Отмена</BButton>
        </template>
    </BModal>
</template>
