import { Toys } from '@mui/icons-material'
import React from 'react'
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
export default function ReadMe() {
  return (
    <div className='    max-w-[460px] mx-auto'>
        <h2 className="text-2xl mb-4 font-medium">Умови доставки та оплати</h2>
        <div class="max-w-2xl mx-auto p-4">
  <h2 class="text-xl font-bold mb-4">Способи доставки:</h2>

  <div class="mb-6">
    <p class="text-lg">Нова пошта (за тарифами перевізника).</p>
  </div>

  <div class="mb-6">
    <p class="text-lg">Самовивіз:</p>
    <p class="text-sm">м. Чернівці, проспект Незалежності, 131, ТЦ "Проспект", оф. № 128А (праворуч від ескалатору)</p>
    <p class="text-sm">м. Чернівці, вул. Головна, 265а, ТРЦ «DEPOt» (2-й поверх)</p>
  </div>
</div>


  <h2 class="text-xl font-bold mb-4">Способи оплати:</h2>

  <div class="mb-6">
    <p class="text-sm">При замовленні доставки товару "Новою Поштою" - оплата здійснюється з Вашого логіну.</p>
   
  </div>
    </div>
  )
}
