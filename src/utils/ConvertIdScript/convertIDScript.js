import fs from 'fs'

// 1. Положить .json файл, в котором нужно изменить IDs в папку ConvertIDScript

// 2.  Вставить в пустую строку имя файла (без расширения файла)
const yourFileName = ''

const INPUT_FILE = `./src/utils/ConvertIdScript/${yourFileName}.json`
const OUTPUT_FILE = `./src/utils/ConvertIdScript/converted-${yourFileName}.json`

try {
  if (!yourFileName) {
    throw new Error('Вы забыли указать имя файла в переменной "yourFileName"!')
  }

  // Читаем исходный файл
  const rawData = fs.readFileSync(INPUT_FILE, 'utf8')
  const ingredients = JSON.parse(rawData)

  // 2. Трансформируем каждый объект через map
  const transformed = ingredients.map((item) => {
    const { _id, ...rest } = item

    return {
      // Превращаем строковый id в специальный объект для MongoDB Compass
      _id: { $oid: _id },
      ...rest,
    }
  })

  // 3. Записываем результат в новый файл

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(transformed, null, 2), 'utf8')

  console.log(`✅ Успешно! Файл для импорта создан: ${OUTPUT_FILE}`)
} catch (error) {
  console.error('❌ Произошла ошибка при конвертации:', error.message)
}

// 4. Запустить скрипт в терминале командой: 'node src/utils/ConvertIdScript/convertIDScript.js'

// 5. В этой же папке появится новый файл converted-${yourFileName}.json
