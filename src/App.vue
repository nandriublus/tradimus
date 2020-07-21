<template>
  <div id="app">
    <div class="sidenav">
      <p id="logotipo">Semantix</p>
      <nav>
        <router-link to="/page1"><img src="/img/icons/orbit.png" alt="ícone de óbita"> Page 1</router-link>
        <router-link to="/page2"><img src="/img/icons/leaf.png" alt="ícone de folha"> Page 2</router-link>
      </nav>
    </div>
    
    <router-view/>
  </div>
</template>

<style>

</style>
