import { test, expect } from '@playwright/test'
import { TIMEOUT } from 'dns'

/// AAA - Arrange, Act, Assert (Preparar, Agir, Verificar)

test('deve consultar um pedido aprovado', async ({ page }) => {

    // Test Data
    const order = 'VLO-DLVJ46'

    // Arrange
    await page.goto('http://localhost:5173/')
    await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

    await page.getByRole('link', { name: 'Consultar Pedido' }).click()
    await expect(page.getByRole('heading')).toContainText('Consultar Pedido')

    // Act
    await page.getByRole('textbox', { name: 'Número do Pedido' }).fill('VLO-DLVJ46')
    await page.getByRole('button', { name: 'Buscar Pedido' }).click()

    // Assert
    const containerPedido = page.getByRole('paragraph')
        .filter({ hasText: /^Pedido$/ })
        .locator('..') // Sobe para o elemento pai (div que agrupa ambos)

    await expect(containerPedido).toContainText('VLO-DLVJ46', {timeout: 10_000})

    await expect(page.getByText('APROVADO')).toBeVisible();
})