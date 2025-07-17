# 💻 Frontend - Sistema de Gestão de Planos

Frontend React  

Sistema de gerenciamento e contratação de planos com interface administrativa e simulação de pagamentos.

---

## 🚀 Deploy

Este projeto já está disponível em produção.

🔗 Acesse diretamente a aplicação sem a necessidade de rodar localmente:

[➡️ Link para o Frontend Deploy](https://seu-front.vercel.app)

> 💡 Caso deseje rodar localmente, siga os passos abaixo normalmente.


## 🖥️ Tecnologias

- React (Vite)
- TypeScript
- Tailwind CSS + ShadCN
- React Router DOM
- Axios
- React Hook Form
- React Toastify
- Lucide React Icons
- Dayjs

---

## 📂 Estrutura

```
frontend/
src/
├── assets/        # Imagens, ícones, fontes e arquivos estáticos
├── components/    # Componentes reutilizáveis da interface (ex: botões, tabelas, inputs, forms)
├── helpers/       # Funções utilitárias e helpers (ex: formatação de preço)
├── layouts/       # Layouts principais (ex: Layout padrão de páginas, layout de admin)
├── lib/           # Integrações externas e instâncias (ex: axios, toast)
├── pages/         # Páginas completas da aplicação (ex: /admin/active-plans, /checkout)
├── schemas/       # Validações com zod ou yup, esquemas de formulário
├── services/      # Serviços de comunicação com a API (ex: getPlans)
├── types/         # Tipagens TypeScript compartilhadas (ex: `Plan`, `Purchases`)

```

---

## ⚙️ Variáveis de Ambiente

Crie um `.env`:

```
VITE_BASE_URL=http://localhost:5173
```

---

## 🧪 Principais Rotas

- `/` → Página de planos disponíveis
- `/checkout/:cycle?planId=id` → Checkout de plano específico
- `/my-plan` → Detalhes do plano assinado
- `/receipt` → Comprovante de pagamento
- `/admin/active-plans` → Tabela de planos com cópia de link
- `/admin/new-plan` → Criação de plano personalizado
- `/${VITE_BASE_URL}/?custom=${plan.id}` → Página que mostra o plano personalizado criado

---

## 🛠️ Como rodar

```bash
cd frontend
npm install
npm run dev
```

---
## 🚀 Fluxos implementados

### 🟢 Escolha inicial

- ✅ Usuário escolhe o plano **Standard**
- 💳 Simula **pagamento bem-sucedido**
- 📄 Redireciona para `/receipt`

---

### ⬆️ Upgrade de plano

- 🔁 Acesso pelo botão **"Alterar Plano"** em `/my-plan`
- ⚠️ Pode haver:
  - ❌ **Recusa** (sem limite): Mensagem visível, sem alteração do plano
  - ✅ **Sucesso**: Redireciona para página de sucesso e atualiza o plano

---

### ⬇️ Downgrade de plano

- 🔁 Mesmo acesso via botão **"Alterar Plano"**
- ⚠️ Pode haver:
  - 🔒 **Não autorizado**: Mensagem exibida ao usuário
  - ✅ **Sucesso**: Plano inferior ativado com sucesso


## ⚠️ Observações

- O sistema simula pagamentos com cartão:
  - Aprovado: `4111 1111 1111 1111`
  - Recusado: qualquer outro número (validação lógica no backend)
  - Todas as tentativas (pagas ou não) aparecem no histórico
