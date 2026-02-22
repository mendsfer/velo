import { test, expect } from '@playwright/test'

import { generateOrderCode } from '../support/helpers'

import { OrderLookupPage } from '../support/pages/OrderLookupPage'

/// AAA - Arrange, Act, Assert (Preparar, Agir, Verificar)

test.describe('Consulta de Pedido', () => {

    test.beforeEach(async ({ page }) => {
        // Arrange
        await page.goto('http://localhost:5173/')
        await expect(page.getByTestId('hero-section').getByRole('heading')).toContainText('Velô Sprint')

        await page.getByRole('link', { name: 'Consultar Pedido' }).click()
        await expect(page.getByRole('heading')).toContainText('Consultar Pedido')
    })

    test('deve consultar um pedido aprovado', async ({ page }) => {

        // Test Data
        const order = {
            number: 'VLO-DLVJ46',
            status: 'APROVADO' as const,
            color: 'Glacier Blue',
            wheels: 'aero Wheels',
            customer: {
                name: 'Fernanda Tester',
                email: 'fernanda@velo.dev'
            },
            payment: 'À Vista'
        }

        // Act
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.serachOrder(order.number)

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        // Validação do badge de status encapsulda no Page Object
        await orderLookupPage.ValidateStatusBadge(order.status)

    })

    test('deve consultar um pedido reprovado', async ({ page }) => {

        // Test Data
        const order = {
            number: 'VLO-YZGSDP',
            status: 'REPROVADO' as const,
            color: 'Midnight Black',
            wheels: 'sport Wheels',
            customer: {
                name: 'Steve Jobs',
                email: 'jobs@apple.com'
            },
            payment: 'À Vista'
        }

        // Act
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.serachOrder(order.number)

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        // Validação do badge de status encapsulda no Page Object
        await orderLookupPage.ValidateStatusBadge(order.status)
    })

    test('deve consultar um pedido em análise', async ({ page }) => {

        // Test Data
        const order = {
            number: 'VLO-YUSASR',
            status: 'EM_ANALISE' as const,
            color: 'Lunar White',
            wheels: 'aero Wheels',
            customer: {
                name: 'Netuno Gatuno',
                email: 'netuno@velo.dev'
            },
            payment: 'À Vista'
        }

        // Act
        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.serachOrder(order.number)

        // Assert
        await expect(page.getByTestId(`order-result-${order.number}`)).toMatchAriaSnapshot(`
            - img
            - paragraph: Pedido
            - paragraph: ${order.number}
            - status:
                - img
                - text: ${order.status}
            - img "Velô Sprint"
            - paragraph: Modelo
            - paragraph: Velô Sprint
            - paragraph: Cor
            - paragraph: ${order.color}
            - paragraph: Interior
            - paragraph: cream
            - paragraph: Rodas
            - paragraph: ${order.wheels}
            - heading "Dados do Cliente" [level=4]
            - paragraph: Nome
            - paragraph: ${order.customer.name}
            - paragraph: Email
            - paragraph: ${order.customer.email}
            - paragraph: Loja de Retirada
            - paragraph
            - paragraph: Data do Pedido
            - paragraph: /\\d+\\/\\d+\\/\\d+/
            - heading "Pagamento" [level=4]
            - paragraph: ${order.payment}
            - paragraph: /R\\$ \\d+\\.\\d+,\\d+/
            `);

        // Validação do badge de status encapsulda no Page Object
        await orderLookupPage.ValidateStatusBadge(order.status)
    })

    test('deve exibir mensagem quando o pedido não é encontrado', async ({ page }) => {

        const order = generateOrderCode()

        const orderLookupPage = new OrderLookupPage(page)
        await orderLookupPage.serachOrder(order)

        
        await expect(page.locator('#root')).toMatchAriaSnapshot(`
                - img
                - heading "Pedido não encontrado" [level=3]
                - paragraph: Verifique o número do pedido e tente novamente
                `);

    })
})