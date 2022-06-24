<script>
import { routes } from "./utils/components";
export default {
  render() {
    const routeLinks = routes.map((route) => (
      <router-link to={route.path}>{route.name}</router-link>
    ));
    return (
      <div id="app">
        <div id="nav">{routeLinks}</div>
        <router-view />
      </div>
    );
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
