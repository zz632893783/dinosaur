import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
    {
        path: '',
        redirect: '/dinosaur'
    },
    {
        path: '/base',
        // name: 'templateSyntax',
        cName: '基础',
        component: () => import('@/views/layout/main.vue'),
        children: [
            {
                path: 'templateSyntax',
                name: 'templateSyntax',
                cName: '模板语法',
                component: () => import('@/views/templateSyntax/index.vue')
            },
            {
                path: 'responsiveFoundation',
                name: 'responsiveFoundation',
                cName: '响应式基础',
                component: () => import('@/views/responsiveFoundation/index.vue')
            },
            {
                path: 'calculationAttribute',
                name: 'calculationAttribute',
                cName: '计算属性',
                component: () => import('@/views/calculationAttribute/index.vue')
            },
            {
                path: 'classStyleBind',
                name: 'classStyleBind',
                cName: '类与样式绑定',
                component: () => import('@/views/classStyleBind/index.vue')
            },
            {
                path: 'conditionalRender',
                name: 'conditionalRender',
                cName: '条件渲染',
                component: () => import('@/views/conditionalRender/index.vue')
            },
            {
                path: 'listRender',
                name: 'listRender',
                cName: '列表渲染',
                component: () => import('@/views/listRender/index.vue')
            },
            {
                path: 'eventHandler',
                name: 'eventHandler',
                cName: '事件处理',
                component: () => import('@/views/eventHandler/index.vue')
            },
            {
                path: 'formInputBind',
                name: 'formInputBind',
                cName: '表单输入绑定',
                component: () => import('@/views/formInputBind/index.vue')
            },
            {
                path: 'lifeCycle',
                name: 'lifeCycle',
                cName: '生命周期',
                component: () => import('@/views/lifeCycle/index.vue')
            },
            {
                path: 'listener',
                name: 'listener',
                cName: '侦听器',
                component: () => import('@/views/listener/index.vue')
            },
            {
                path: 'templateReference',
                name: 'templateReference',
                cName: '模板引用',
                component: () => import('@/views/templateReference/index.vue')
            },
            {
                path: 'componentBase',
                name: 'componentBase',
                cName: '组件基础',
                component: () => import('@/views/componentBase/index.vue')
            }
        ]
    },
    {
        path: '/component',
        // name: 'templateSyntax',
        cName: '深入组件',
        component: () => import('@/views/layout/main.vue'),
        children: [
            {
                path: 'register',
                name: 'register',
                cName: '注册',
                component: () => import('@/views/register/index.vue')
            },
            {
                path: 'props',
                name: 'props',
                cName: 'props',
                component: () => import('@/views/props/index.vue')
            },
            {
                path: 'event',
                name: 'event',
                cName: '事件',
                component: () => import('@/views/event/index.vue')
            },
            {
                path: 'componentVModel',
                name: 'componentVModel',
                cName: '组件 v-model',
                component: () => import('@/views/componentVModel/index.vue')
            },
            {
                path: 'penetrateAtributes',
                name: 'penetrateAtributes',
                cName: '透传 Atributes',
                component: () => import('@/views/penetrateAtributes/index.vue')
            },
            {
                path: 'slot',
                name: 'slot',
                cName: '插槽',
                component: () => import('@/views/slot/index.vue')
            },
            {
                path: 'dependencyInjection',
                name: 'dependencyInjection',
                cName: '依赖注入',
                component: () => import('@/views/dependencyInjection/index.vue')
            },
            {
                path: 'asyncComponent',
                name: 'asyncComponent',
                cName: '异步组件',
                component: () => import('@/views/asyncComponent/index.vue')
            }
        ]
    },
    {
        path: '/logicalReuse',
        // name: 'templateSyntax',
        cName: '逻辑复用',
        component: () => import('@/views/layout/main.vue'),
        children: [
            {
                path: 'combinatorialFunction',
                name: 'combinatorialFunction',
                cName: '组合式函数',
                component: () => import('@/views/combinatorialFunction/index.vue')
            },
            {
                path: 'directive',
                name: 'directive',
                cName: '自定义指令',
                component: () => import('@/views/directive/index.vue')
            },
            {
                path: 'plugin',
                name: 'plugin',
                cName: '插件',
                component: () => import('@/views/plugin/index.vue')
            }
        ]
    },
    {
        path: '/builtInComponent',
        // name: 'templateSyntax',
        cName: '内置组件',
        component: () => import('@/views/layout/main.vue'),
        children: [
            {
                path: 'transition',
                name: 'transition',
                cName: 'transition',
                component: () => import('@/views/transition/index.vue')
            },
            {
                path: 'transitionGroup',
                name: 'transitionGroup',
                cName: 'transitionGroup',
                component: () => import('@/views/transitionGroup/index.vue')
            },
            {
                path: 'keepAlive',
                name: 'keepAlive',
                cName: 'keepAlive',
                component: () => import('@/views/keepAlive/index.vue')
            },
            {
                path: 'teleport',
                name: 'teleport',
                cName: 'teleport',
                component: () => import('@/views/teleport/index.vue')
            },
            {
                path: 'suspense',
                name: 'suspense',
                cName: 'suspense',
                component: () => import('@/views/suspense/index.vue')
            }
        ]
    },
    {
        path: '/dinosaur',
        // name: 'templateSyntax',
        cName: '小恐龙',
        component: () => import('@/views/dinosaur/index.vue'),
    }
]

export const router = createRouter({
    history: createWebHistory(),
    routes
})
