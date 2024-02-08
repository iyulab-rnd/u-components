import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
    root: 'src',
    build: {
        lib: {
            entry: 'src/index.ts', // 라이브러리의 진입점
            name: 'MyLibrary', // UMD 빌드에서 사용될 전역 변수의 이름
            fileName: (format) => `index.${format}.js`,
            formats: ['cjs', 'es', 'umd'], // 빌드할 포맷
        },
        rollupOptions: {
            // 외부화할 종속성을 지정
            external: ['react', 'react-dom', 'react-router-dom', 'lit'],
            output: {
                // 전역 변수로 사용될 종속성 지정
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react-router-dom': 'ReactRouterDOM',
                    lit: 'Lit'
                }
            }
        }
    },
    plugins: [
        dts()
    ]
});