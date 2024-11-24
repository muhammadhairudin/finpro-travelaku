import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../lib/axios'

// Fetch transactions
export const fetchTransactions = createAsyncThunk(
  'transaction/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/v1/my-transactions')
      return response.data.data || []
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Create transaction
export const createTransaction = createAsyncThunk(
  'transaction/create',
  async (data, { rejectWithValue }) => {
    try {
      console.log('Creating transaction with data:', data)
      const response = await api.post('/api/v1/create-transaction', data)
      console.log('Transaction response:', response.data)
      return response.data
    } catch (error) {
      console.error('Transaction error:', error.response?.data || error)
      return rejectWithValue(error.response?.data || error.message)
    }
  }
)

// Update transaction proof
export const updateTransactionProof = createAsyncThunk(
  'transaction/updateProof',
  async ({ transactionId, proofPaymentUrl }, { rejectWithValue }) => {
    try {
      // Pastikan URL valid
      if (!proofPaymentUrl) {
        throw new Error('URL bukti pembayaran tidak valid')
      }

      // Update bukti pembayaran
      const response = await api.post(
        `/api/v1/update-transaction-proof-payment/${transactionId}`,
        { proofPaymentUrl }
      )

      // Jika berhasil, fetch ulang data transaksi
      if (response.data.status === 'OK') {
        const updatedTransactions = await api.get('/api/v1/my-transactions')
        return updatedTransactions.data.data
      }

      throw new Error('Gagal update bukti pembayaran')
    } catch (error) {
      console.error('Update proof error:', error)
      return rejectWithValue(error.message || 'Gagal update bukti pembayaran')
    }
  }
)

// Update transaction status (Admin only)
export const updateTransactionStatus = createAsyncThunk(
  'transaction/updateStatus',
  async ({ transactionId, status }, { rejectWithValue }) => {
    try {
      await api.post(
        `/api/v1/update-transaction-status/${transactionId}`,
        { status }
      )
      return { transactionId, status }
    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)

// Delete transaction - Ganti endpoint sesuai API
export const deleteTransaction = createAsyncThunk(
  'transaction/delete',
  async (transactionId, { rejectWithValue }) => {
    try {
      // Ganti dengan endpoint yang benar
      await api.delete(`/api/v1/delete-transaction/${transactionId}`)
      return transactionId
    } catch (error) {
      console.error('Delete transaction error:', error)
      return rejectWithValue(
        error.response?.data?.message || 'Gagal menghapus transaksi'
      )
    }
  }
)

export const uploadProofPayment = createAsyncThunk(
  'transaction/uploadProof',
  async ({ transactionId, proofUrl }) => {
    const response = await api.post(
      `/api/v1/update-transaction-proof-payment/${transactionId}`,
      { proofPaymentUrl: proofUrl }
    )
    return response.data
  }
)

const transactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    transactions: [],
    currentTransaction: null,
    isLoading: false,
    error: null
  },
  reducers: {
    clearTransaction: (state) => {
      state.currentTransaction = null
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Transactions
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = action.payload
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Create Transaction
      .addCase(createTransaction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTransaction = action.payload
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Update Transaction Proof
      .addCase(updateTransactionProof.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(updateTransactionProof.fulfilled, (state, action) => {
        state.isLoading = false
        state.currentTransaction = action.payload
      })
      .addCase(updateTransactionProof.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Delete Transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.isLoading = true
        state.error = null
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.isLoading = false
        state.transactions = state.transactions.filter(
          t => t.id !== action.payload
        )
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.payload
      })
      // Upload Proof Payment
      .addCase(uploadProofPayment.pending, (state) => {
        state.isLoading = true
      })
      .addCase(uploadProofPayment.fulfilled, (state, action) => {
        state.isLoading = false
        // Update transaction in state
        const index = state.transactions.findIndex(t => t.id === action.payload.id)
        if (index !== -1) {
          state.transactions[index] = action.payload
        }
      })
      .addCase(uploadProofPayment.rejected, (state, action) => {
        state.isLoading = false
        state.error = action.error.message
      })
  }
})

export const { clearTransaction } = transactionSlice.actions
export default transactionSlice.reducer 