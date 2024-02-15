import { defineConfig, normalizePath } from 'vite';
import dts from "vite-plugin-dts";
import { viteStaticCopy } from 'vite-plugin-static-copy'
import { resolve } from 'path'
import glob from "fast-glob";

const entries = {} as any;
glob.sync(['src/**/index.ts']).map(path => {
  // console.log(path);
  /**
   * ex)
   * name: 'base/u-label/index'
   * path: 'src/components/base/u-label/index.ts'
   */
  const name = path.replace('src/', '').replace('.ts', '');
  entries[name] = resolve(__dirname, path);
});

export default () => {
  return defineConfig({
    build: {
      minify: false,
      outDir: 'dist',
      lib: {
        entry: {
          ...entries // index 엔트리 포인트
        },
        fileName: (format: string, entry: string): string => {
          return `${entry}.${format}.js`;
        },
        formats: ['es', 'cjs']
      },
      rollupOptions: {
        // 외부 종속성
        external: [
          'lit',
          'lit/decorators.js',
          'lit/directives/if-defined.js',
          'mobx'
        ],
        // 공통 파일
        output: {
          chunkFileNames: 'shared/[name]-[hash].js',
        }
      }
    },
    plugins: [
      // dts 파일 생성
      dts({
        include: [ "src/**/*"]
      }),
      viteStaticCopy({
        // 정적 파일 복사(svg, css)
        targets: [
          {
            src: normalizePath(resolve(__dirname, 'src/assets')),
            dest: normalizePath(resolve(__dirname, 'dist')),
            overwrite: true
          }
        ]
      }),
    ]
  })
}