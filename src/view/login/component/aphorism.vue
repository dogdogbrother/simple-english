<template>
  <div class="aphorism">
    <h4 fw-b>Game of Thrones</h4>
    <p class="phrase">leave one wolf alive and sheep are never safe.</p>
    <div class="zh-phrase">
      一狼尚存,羊群永无宁日
      <div>
        <span>—— </span>
        <span class="person">Arya Stark</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@media screen and (min-width:1000px) {
  .aphorism {
    h4 {
      color: #EB642C;
      line-height: 2;
      font-size: 36px;
    }
    .phrase {
      color: #fff;
      margin-bottom: 20px;
      line-height: 1.2;
      font-size: 34px;
    }
    .zh-phrase {
      color: #fff;
      font-size: 28px;
      display: flex;
      align-items: flex-end;
      div {
        font-size: 16px;
        margin-left: 20px;
        .person {
          color: #EB642C;
          font-weight: bold;
        }
      }
    }
  }
}
@media screen and (max-width:1000px) {
  .aphorism {
    h4 {
      color: #EB642C;
      line-height: 1.4;
      font-size: 22px;
    }
    .phrase {
      color: #fff;
      margin-bottom: 10px;
      line-height: 1.2;
      font-size: 22px;
    }
    .zh-phrase {
      color: #fff;
      font-size: 20px;
      div {
        font-size: 14px;
        .person {
          color: #EB642C;
          font-weight: bold;
        }
      }
    }
  }
}

</style>