
// 0. Если используем модульную систему (например через vue-cli),
// импортируем Vue и VueRouter и затем вызываем `Vue.use(VueRouter)`.

// 1. Определяем компоненты для маршрутов.
// Они могут быть импортированы из других файлов
const mainContent = "vue/top-content.js";

// 2. Определяем несколько маршрутов
// Каждый маршрут должен указывать на компонент.
// "Компонентом" может быть как конструктор компонента, созданный
// через `Vue.extend()`, так и просто объект с опциями компонента.
// Мы поговорим о вложенных маршрутах позднее.
const routes = [
  { path: '/', component: mainContent }
]

// 3. Создаём экземпляр маршрутизатора и передаём маршруты в опции `routes`
// Вы можете передавать и дополнительные опции, но пока не будем усложнять.
const router = new VueRouter({
  routes // сокращённая запись для `routes: routes`
})

// 4. Создаём и монтируем корневой экземпляр приложения.
// Убедитесь, что передали экземпляр маршрутизатора в опции
// `router`, чтобы позволить приложению знать о его наличии.
const app = new Vue({
  router
}).$mount('#app')

// Всё, приложение работает! ;)

 //       <script src="vue/top-content.js"></script>
 //       <script src="vue/main-content.js"></script>
 //       <script src="vue/personalisation.js"></script>
 //       <script src="vue/apply-photo.js"></script>
 //       <script src="vue/no-photo.js"></script>
 //       <script src="vue/gif-ready.js"></script>
//        <script src="vue/main.js"></script>
//        <script src="vue/final-page.js"></script>