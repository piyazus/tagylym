export default {
    name: 'course',
    title: 'Курс',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Название',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: { source: 'title' },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'description',
            title: 'Описание',
            type: 'text',
        },
        {
            name: 'category',
            title: 'Категория',
            type: 'string',
            options: {
                list: ['robot-design', 'innovation', 'coding', 'robot-game'],
            },
        },
        {
            name: 'level',
            title: 'Уровень',
            type: 'string',
            options: {
                list: ['beginner', 'intermediate', 'advanced'],
            },
        },
        {
            name: 'order',
            title: 'Порядок',
            type: 'number',
        },
    ],
}
