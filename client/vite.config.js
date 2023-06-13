import dotenv from 'dotenv'
dotenv.config({ path: '../.env' })
// console.log('testtest', process.env.PORT)
export default {
    server: {
        proxy: {
            '/api': `http://localhost:${process.env.PORT}`,
        },
    },
    cacheDir: '../node_modules/.vite',
}
